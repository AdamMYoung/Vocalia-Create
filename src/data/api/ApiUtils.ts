/**
 * Injects a fetch object with access token headers and returns it.
 * @param url Path to query.
 * @param accessToken Access token to verify users.
 */
export function getInjectedFetch(
  url: string,
  accessToken: string | null,
  queryType: string = "GET",
  body: {} | null = null
) {
  var headers = new Headers({
    "content-type": "application/json",
    Authorization: "Bearer " + accessToken
  });

  return accessToken != null
    ? fetch(url, {
        headers: headers,
        method: queryType,
        body: body != null ? JSON.stringify(body) : null
      })
    : fetch(url, {
        method: queryType,
        body: body != null ? JSON.stringify(body) : null
      });
}
