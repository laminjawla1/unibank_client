"use client";
import UserRegistrationForm from "@/components/UserRegistrationForm";
import RequireRole from "@/components/RequireRole";

const AddUser = () => {
  return (
    <RequireRole anyOf={["ROLE_ADMIN", "ROLE_TELLER"]}>
      <UserRegistrationForm cancelHref="/users" successRedirectHref="/users" />
    </RequireRole>
  );
};

export default AddUser;
