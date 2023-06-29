// import { useState, useContext } from "react";
// import { Text } from "../../api/Context/Text";

// import { Form, Button } from "react-bootstrap";
// import { PuffLoader, BarLoader } from "react-spinners";

// function CreateAccount({ userData, updateUserData, createAccount }) {
//   const text = useContext(Text);

//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [accountCreated, setAccountCreated] = useState(false);
//   const [creatingAccount, setCreatingAccount] = useState(false);

//   const checkEmailVerified = async (user) => {
//     await user.reload();
//     console.log("user verified", user.emailVerified);
//     return user.emailVerified;
//   };

//   const startCheckingEmailVerified = (user) => {
//     const checkInterval = setInterval(async () => {
//       const isEmailVerified = await checkEmailVerified(user);
//       if (isEmailVerified) {
//         clearInterval(checkInterval);
//         updateUserData("verified", true);
//       }
//     }, 1000);
//   };

//   const handleCreateAccount = async (event) => {
//     event.preventDefault();

//     if (userData.password !== confirmPassword) {
//       // Show some error to the user
//       return;
//     }

//     setCreatingAccount(true);

//     const user = await createAccount(userData.email, userData.password);
//     startCheckingEmailVerified(user);

//     setAccountCreated(true);
//     setCreatingAccount(false);
//   };

//   if (accountCreated) {
//     return (
//       <div className={"d-flex-center flex-column"}>
//         <p className="p-large text-center mt-3">{text.register.verifyEmail}</p>
//         <PuffLoader size={50} color="var(--secondary-color)" />
//       </div>
//     );
//   }

//   return (
//     <>
//       <Form.Group className="mb-3">
//         <Form.Label>{text.register.email}</Form.Label>
//         <Form.Control
//           type="email"
//           value={userData.email}
//           placeholder={text.register.email}
//           onChange={(e) => updateUserData("email", e.target.value)}
//           required
//         />
//       </Form.Group>
//       <Form.Group className="mb-2">
//         <Form.Label>{text.register.password}</Form.Label>
//         <Form.Control
//           type="password"
//           value={userData.password}
//           placeholder={text.register.password}
//           onChange={(e) => updateUserData("password", e.target.value)}
//           required
//         />
//       </Form.Group>
//       <Form.Group className="mb-3">
//         <Form.Control
//           type="password"
//           value={confirmPassword}
//           placeholder={text.register.confirmPassword}
//           onChange={(e) => setConfirmPassword(e.target.value)}
//           required
//         />
//       </Form.Group>
//       <Button className="" onClick={handleCreateAccount}>
//         {creatingAccount ? (
//           <BarLoader size={4} color="rgba(77, 235, 168, 1)" />
//         ) : (
//           text.register.createAccount
//         )}
//       </Button>
//     </>
//   );
// }

// export default CreateAccount;
