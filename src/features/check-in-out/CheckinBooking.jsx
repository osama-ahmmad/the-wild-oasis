import styled from "styled-components";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import BookingDataBox from "../../features/bookings/BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";
import Checkbox from "../../ui/Checkbox";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import { useCheckin } from "./useCheckin";
import { useSettings } from "../settings/useSettings";
import { formatCurrency } from "../../utils/helpers";

const Box = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmedPaid, setConfirmedPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);

  const { bookingId } = useParams();

  const { booking, isPending } = useBooking(bookingId);
  const { settings, isPending: isLoadingSettings } = useSettings();

  const moveBack = useMoveBack();
  const { checkin, isCheckingIn } = useCheckin();

  useEffect(() => {
    setConfirmedPaid(booking?.isPaid ?? false);
  }, [booking]);

  if (isPending || isLoadingSettings) return <Spinner />;

  const {
    id: bookingIdFromData,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  const optionalBreakfastPrice =
    settings?.breakfastPrice * numNights * numGuests ?? 0;

  function handleCheckin() {
    if (!confirmedPaid) return;

    checkin({
      bookingId: bookingIdFromData,
      breakfast: addBreakfast
        ? {
            hasBreakfast: true,
            extraPrice: optionalBreakfastPrice,
            totalPrice: totalPrice + optionalBreakfastPrice,
          }
        : {},
    });
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingIdFromData}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((add) => !add);
              setConfirmedPaid(false);
            }}
            id="breakfast">
            Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}?
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          checked={confirmedPaid}
          onChange={() => setConfirmedPaid((confirmed) => !confirmed)}
          id="confirm"
          disabled={confirmedPaid || isCheckingIn}>
          I confirm that {guests?.fullName} has paid the total amount of{" "}
          {!addBreakfast
            ? formatCurrency(totalPrice)
            : `${formatCurrency(optionalBreakfastPrice)} (${formatCurrency(
                totalPrice + optionalBreakfastPrice,
              )})`}{" "}
          for this booking.
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button
          onClick={handleCheckin}
          disabled={!confirmedPaid || isCheckingIn}>
          Check in booking #{bookingIdFromData}
        </Button>

        <Button variant="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
