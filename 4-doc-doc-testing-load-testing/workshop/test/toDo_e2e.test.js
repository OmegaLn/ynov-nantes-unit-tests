const CLIENT_URL = `http://localhost:5000/`;

Feature("ToDo Client");

Scenario("Test create ToDo", ({ I }) => {
  I.amOnPage(CLIENT_URL);
  I.fillField(".form-control", "mytodo");
  I.click("#create-todo");
  I.waitForText("mytodo");
});

Scenario("Test complete todo", ({ I }) => {
  I.amOnPage(CLIENT_URL);
  I.fillField(".form-control", "mytodo");
  I.click("#create-todo");
  I.waitForText("mytodo");
  I.click("#todo-body tr:last-child button");
  I.waitForText("mytodo", "#done-body");
});