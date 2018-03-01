function goTo(href, args) {
  return {type: goTo.name, href, args};
}

export {
  goTo
}