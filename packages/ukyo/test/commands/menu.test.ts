import { expect, test } from "@oclif/test";

describe("Menu command", () => {
  test
    .stdout()
    .command([""])
    .it("runs menu by default", (ctx) => {
      expect(ctx.stdout).to.contain("How can I help you?");
      process.exit(0);
    });

  // test
  //   .stdout()
  //   .command(["hello", "--name", "jeff"])
  //   .it("runs hello --name jeff", (ctx) => {
  //     expect(ctx.stdout).to.contain("hello jeff");
  //   });
});
