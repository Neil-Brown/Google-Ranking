const expect = require("chai").expect;
const request = require('supertest');
const app = require("../app.js")

agent = request.agent(app)

describe("getRank", ()=>{
	it("home page should return 200", ()=>{
		request(app)
		.get("/")
		.then (res =>{
			expect(res.status).to.equal(200);
		})
	})

	it("should return 200 and result for valid request", ()=>{
		request(app)
		.post("/getRank")
		.field("key", "google")
		.field("site", "https://google.com")
		.then(res=>{
			expect(res.status).to.equal(200);
			expect(Object.keys(res.body)).to.include("pos")
			expect(Object.keys(res.body)).to.include("link")
		})
	})

	it("should return 400 for getRank if no site supplied", ()=>{
		request(app)
		.post("/getRank")
		.field("key", "foo")
		.then(res=>{
			expect(res.status).to.equal(400);
			expect(res.text).to.equal("Site URL required")
		})
	})

	it("should return 400 for getRank if site is blank", ()=>{
		request(app)
		.post("/getRank")
		.field("key", "foo")
		.field("site", "")
		.then(res=>{
			expect(res.status).to.equal(400);
			expect(res.text).to.equal("Site URL required")
		})
	})

	it("should return 400 for getRank if no key supplied", ()=>{
		request(app)
		.post("/getRank")
		.field("site", "foo")
		.then(res=>{
			expect(res.status).to.equal(400);
			expect(res.text).to.equal("Keyword required")
		})
	})

	it("should return 400 for getRank if key is blank", ()=>{
		request(app)
		.post("/getRank")
		.field("key", "")
		.field("site", "foo")
		.then(res =>{
			expect(res.status).to.equal(400);
			expect(res.text).to.equal("Keyword required")
		})
	})
})
