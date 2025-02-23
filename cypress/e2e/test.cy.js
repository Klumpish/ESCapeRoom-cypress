///<reference types="cypress" />
const url = "https://jorlindstrom.github.io/HACKER-ESCAPEROOM/";
describe("template spec", () => {
	// beforeEach(() => {
	// 	cy.visit(url);
	// });
	// it("test LiveServer", () => {
	// 	cy.visit("http://127.0.0.1:5500/HACKER-ESCAPEROOM");
	// });
	it("test deployed website", () => {
		cy.visit(url);
		cy.get("body").should("exist");
		cy.title().should("exist");
		cy.url().should("include", "HACKER-ESCAPEROOM");
	});
	it("checks for h2 on /", () => {
		cy.visit(url);
		cy.get("h2").should("contain", "Popular challenges right now");
	});
	it("should find tag 'Javascript' on challange site filter function", () => {
		cy.visit(url + "challenges.html");
		cy.wait(1000);
		cy.get(".filterBtn").click();
		cy.get(".filterWindow").should("be.visible");
		cy.get("[for='javascript']")
			.should("be.visible")
			.click()
			.should("contain.text", "JavaScript");
	});
	it("should navigate from start page to /challanges page", () => {
		cy.visit(url);
		cy.get(":nth-child(2) > .main-nav__item-link").click();
		cy.url().should("include", "/challenges");
	});
	it("should respond with 'no challanges' if numbers/symbols are input in search filter", () => {
		cy.visit(url + "challenges.html");
		cy.wait(1000);
		cy.get(".filterBtn").click();
		cy.get(".filterWindow").should("be.visible");
		cy.get(".filterSearch_input").type("/43*");
		cy.get("#noChallengeh2").should("contain", "No matching challenges");
	});
});
