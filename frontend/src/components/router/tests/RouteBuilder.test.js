import UrlPattern from 'url-pattern'
import {RouteBuilder} from "../index";


it('Should resolve a static URL', function () {
  let myCallback = () => "hello";
  let routes = new RouteBuilder()
    .path("/homepage", myCallback)
    .path("/homepage2", myCallback)
    .notFound(() => {
    })

  expect(routes.resolve("/homepage")).toBe("hello");
});

it('Should pass arguments to callback', function () {
  let parameters = null;

  let routes = new RouteBuilder()
    .path("/product/:name/:version", (p) => parameters = p)
    .notFound(() => {
    });

  routes.resolve("/product/iphone/5");

  expect(parameters).toEqual({name: "iphone", version: "5"});
});


it('Should return notFound when there is no match', function () {
  let routes = new RouteBuilder()
    .path("/a", () => {
    })
    .path("/b", () => {
    })
    .notFound(() => "Not Found");

  expect(routes.resolve("/c")).toEqual("Not Found");
});


it("Learning Test: should extract parameters", function () {
  expect(new UrlPattern("/product/:id/:name").match("/product/a/b")).toEqual({id: "a", name: "b"})
});

it('Should prioritize first match', function () {
  let routes = new RouteBuilder()
    .path("/a/x", () => "exact match")
    .path("/a/:id", () => {
    })
    .notFound(() => "Not Found");

  expect(routes.resolve("/a/x")).toEqual("exact match");
});
