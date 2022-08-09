// npx cypress run

import { faker } from "@faker-js/faker";

let newClient = {
  mail: `test${Math.round(Date.now() / 1000)}@testujudigitoo.cz`,
  phone: "607011090", //Jakub telefon
  invoices: faker.random.numeric(4),
  system: "Abra Flex",
};

const document = ["invoice1.pdf", "invoice2.pdf", "invoice3.pdf"];

describe("Web Upload of Document CZ", () => {
  it.skip("Nahrání a vyčtení dokumentu web CZ", () => {
    cy.intercept("POST", "/api/data/extract-invoice").as("extraction");
    cy.visit("/");
    cy.wait(3000);

    const file = document[faker.datatype.number(document.length - 1)];

    cy.fixture(file, "binary")
      .then(Cypress.Blob.binaryStringToBlob)
      .then((fileContent) => {
        cy.get('[for="file-input"]').click().attachFile({
          fileContent,
          filePath: file,
          mimeType: "application/pdf",
          encoding: "utf8",
          lastModified: new Date().getTime(),
        });
      });

    cy.wait("@extraction", { timeout: 60000 });
    cy.url().should("include", "processed-invoice");

    cy.get(".headerbar").should("be.visible");
    cy.get(".section-inner").should("be.visible");
    cy.get(".visuals").should("be.visible");
    cy.contains("Načtená data").should("be.visible");
    cy.contains("Vaše faktura").should("be.visible");
  });
});

///api/data/user-status?email=test1658241761%40testujudigitoo.cz
///api/data/user-status?email=test1658241761@testujudigitoo.cz
