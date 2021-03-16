import api from "..";

export function hello() {
  return api({
    method: "GET",
    url: "/user/hello",
  });
}
