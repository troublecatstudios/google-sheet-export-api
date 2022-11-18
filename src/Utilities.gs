function variablify(name) {
  return name = name.replace(/\W/ig, '').replace(/\s/ig, '');
}
