import { FormKitNode } from "@formkit/core";
import { FetchError } from "ofetch";

export function handleInvalidForm(err: any, node?: FormKitNode) {
  if (err instanceof FetchError && err.status === 422) {
    node?.setErrors([], err.data?.errors);
  }
}
