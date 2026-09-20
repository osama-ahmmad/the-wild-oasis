import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FullPage = styled.div`
  height: 100vh;
  display: flex;
  background-color: var(--color-grey-50);
  justify-content: center;
  align-items: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  //1. Load Authenticated User
  const { isPending, isAuthenticated } = useUser();

  //2. If user is not authenticated, redirect to login page
  useEffect(() => {
    if (!isAuthenticated && !isPending) {
      navigate("/login");
    }
  }, [isAuthenticated, isPending, navigate]);

  //3. While loading, show spinner
  if (isPending)
    return (
      <FullPage>
        <Spinner />;
      </FullPage>
    );

  //4. If user is authenticated, render the children (protected content)
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
