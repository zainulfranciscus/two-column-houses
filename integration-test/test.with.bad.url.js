import { Selector } from "testcafe";

fixture`Fetching json from a bad URL`.page`http://localhost:3000/`;

test("An error message should be displayed, because no JSON exist in this URL", async t => {
  await t
    .expect(Selector("#error").innerText).contains("Unable to fetch JSON file from the given URL");
});

