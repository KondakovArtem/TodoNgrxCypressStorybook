/// <reference types="cypress" />

/**
 * Code generated with Fd Cypress Recorder.
 * https://github.com/FDMediagroep/fd-cypress-recorder
 */

describe("Test Suite ...", () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.reload(true);
  });

  afterEach(() => {
    cy.clearCookies();
  });

  it("should ...", () => {
    cy.viewport(1920, 930);

    cy.server();
    cy.route("GET", "/api/todos").as("getTodos");
    cy.route("PATCH", "/api/todos/*").as("pathTodo");
    cy.route("POST", "/api/todos").as("postTodos");

    cy.visit(
      "http://localhost:6006/iframe.html?id=containers-layoutcontainer--basic&viewMode=story",
      { headers: {} }
    );

    cy.wait(100);
    cy.get(":nth-child(1) > li > div > input").click();
    cy.get("#new-todo").type("test{enter}").blur();
    cy.wait(["@postTodos", "@pathTodo"]);
    cy.wait(100);

    // snapshot name will be the test title
    if (Cypress.browser.isHeadless) {
      cy.matchImageSnapshot();
    }
  });
});
