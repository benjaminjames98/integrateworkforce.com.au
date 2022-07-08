import {password_authenticator} from "../../model/auth/password_authenticator";

let form = document.getElementById("form");

form.addEventListener("submit", async e => {
  e.preventDefault();

  let formData = new FormData(e.currentTarget);

  let authenticator = password_authenticator();
  let response = await authenticator.login(
    formData.get("name"),
    formData.get("pass")
  );

  if (!response)
    document.getElementById("result_p").innerText = "Incorrect login details";
});