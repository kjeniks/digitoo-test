import { faker } from "@faker-js/faker";

let newClient = {
  mail: `test${Math.round(Date.now() / 1000)}@testujudigitoo.cz`,
  phone: "607011090", //Jakub telefon
  invoices: faker.random.numeric(4),
  system: "Abra Flex",
};

describe("Webová registrace CZ", () => {
  it("Kontrola registrace na webu CZ", () => {
    cy.intercept("POST", "/api/forms/register").as("registraceCompleted");
    cy.intercept("GET", `/api/data/user-status?email=**`).as("nextStep");
    cy.visit("/");
    cy.wait(2000);
    cy.get(
      ".headerbar-inner > .cta > .btn-default > .btn-flex > .btn-inner"
    ).click();
    cy.get('input[placeholder="E-mail"]').type(newClient.mail);
    cy.get('input[placeholder="Telefon"]').type(newClient.phone);
    cy.contains("Pokračovat").click();
    cy.wait("@nextStep").wait(1500);
    cy.get("p")
      .contains(
        "Zvolte váš účetní systém a približný počet přijatých faktur za měsíc."
      )
      .should("be.visible");
    cy.get('[name="expectedInvoices"]').type(newClient.invoices);
    cy.get('[name="erpSystem"]').click().type(`${newClient.system}{enter}`);
    cy.get('button[type="submit"]').click();
    cy.wait("@registraceCompleted")
      .its("response")
      .then((res) => {
        expect(res.statusCode).to.be.equal(200);
        expect(res.body.result).to.be.equal("success");
        expect(res.body.status).to.be.equal(true);
        expect(res.body.message).includes("Registrace proběhla v pořádku.");
      });
    cy.wait(1500);
    cy.get("h3").contains("Mrkněte do emailu!").should("be.visible");
  });
});

///api/data/user-status?email=test1658241761%40testujudigitoo.cz
///api/data/user-status?email=test1658241761@testujudigitoo.cz
