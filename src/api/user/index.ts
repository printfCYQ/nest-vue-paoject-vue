import api from "..";

export function hello() {
  return api({
    method: "GET",
    url: "/user/hello",
  });
}

export function findUserByIdApi(id: string) {
  return api({
    method: "POST",
    url: "/user/findUserById/" + id,
  });
}

