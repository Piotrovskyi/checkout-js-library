module.exports.addParameterToUrl = (url, parameterName, parameterValue) => {
  const  qpos = url.indexOf('?');
  const hpos = url.indexOf('#');
  const sep = qpos === -1 ? '?' : '&';
  const segment = sep + encodeURIComponent(parameterName) + '=' + encodeURIComponent(parameterValue);
  return hpos == -1 ? url + segment : url.substring(0, hpos) + segment + url.substring(hpos);
}
