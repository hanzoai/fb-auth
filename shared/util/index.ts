
// https://www.w3resource.com/javascript-exercises/fundamental/javascript-fundamental-exercise-123.php
export const toKebabCase = (str: string): string => {
  const regex = /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
  const arr: string[] = (str) ? str.match(regex) as string[] : [] 

  return arr.map((x) => (x.toLowerCase())).join('-')
}

export const toCamelCase = (str: string): string => {
  return (str.slice(0, 1).toLowerCase() + str.slice(1))
    .replace(/([-_ ]){1,}/g, ' ')
    .split(/[-_ ]/)
    .reduce((cur, acc) => {
      return cur + acc[0].toUpperCase() + acc.substring(1);
    });
}

export const toPascalCase = (str: string): string => {
  return capitalize(toCamelCase(str))
}

export const capitalize = (str: string): string => (
  str.charAt(0).toUpperCase() + str.slice(1)
)

  //str.replace(/([A-Z]+|[A-Z]?[a-z]+)(?=[A-Z]|\b)/g, '!$&').split('!').join(' ')
export const splitCamelOrPascalCase = (str: string): string => {
  const camelCase = str.charAt(0).toUpperCase() + str.slice(1) 
  return camelCase.replace(/([0-9A-Z])/g, ' $&')
}


// https://fettblog.eu/typescript-typing-catch-clauses/
export const errorToString = (e: any): string => {
  let result: string
  if (e instanceof Error) {
    result = e.message
  }
  else if (typeof e === 'string') {
    result = e as string
  }
  else {
    result = e.toString()
  }
  return result
}

    // Format is "CODE403: reason for error"
export const errorToCodeAndMessage = (e: any, defaultCode: number = 400) => {
  let message = errorToString(e)
  let code = defaultCode
  if (message.startsWith('CODE')) {
    const codeStr = message.slice(4, 7)
    code = parseInt(codeStr)    
    message = message.slice(8) // colon
  }
  return {
    code,
    message
  }
}

// https://spin.atomicobject.com/2017/06/19/strongly-typed-date-string-typescript/
// Should create a module out of this and license as MIT, as suggested in the article.

enum DateStringMarker { } // internal only

export type DateString = string & DateStringMarker

/*
const isValidISODate = (str: string): boolean => {
  const bits = str.split('-')
  const d = new Date(Number(bits[0]), Number(bits[1]) – 1, Number(bits[2]));
  return d && (d.getMonth() + 1) === Number(bits[1]) && d.getDate() === Number(bits[2]);
}
*/

export const isDate = (date: string) => (
  (new Date(date).toString() !== "Invalid Date") && !isNaN(new Date(date).getTime())
)

export const isValidDateString = (str: string): str is DateString  => (
  str.match(/^\d{4}-\d{2}-\d{2}$/) !== null
)
