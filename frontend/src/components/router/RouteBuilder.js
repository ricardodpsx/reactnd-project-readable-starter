import UrlPattern from 'url-pattern'

class RouteBuilder {
  routes = [];

  resolve(actualPath) {
    let found = this.routes.find(c => c.matches(actualPath));
    return (found && found.call(actualPath)) || this.notFoundCallback(actualPath);
  }

  notFound(cb) {
    this.notFoundCallback = cb;
    return this;
  }

  path(pathExpression, callback, onChange) {
    this.routes.push(new Route(pathExpression, callback, onChange));
    return this;
  }
}

class Route {
  constructor(pathExpression, callback, onChange) {
    this.pathExpression = pathExpression;
    this.callback = callback;
    this.onChange = onChange;
    this.pattern = new UrlPattern(this.pathExpression);
  }

  matches(actualPath) {
    return this.pattern.match(actualPath);
  }

  getArguments(actualPath) {
    return this.pattern.match(actualPath);
  }

  call(actualPath) {
    let args = this.getArguments(actualPath);
    args && this.onChange && this.onChange(args);
    return args && this.callback(args);
  }
}

export default RouteBuilder;