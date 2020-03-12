
window.onload = function(){

document.getElementById('check-btn').addEventListener('click', function(){
  let text = document.getElementById("input-text").value
  //console.log(text)
  document.getElementById('output').innerHTML = checkPairsInText(text,
                                                      [{open: '(', close:')'}, 
                                                      {open: '[', close:']'}, 
                                                      {open: '{', close:'}'}])
  // console.log(checkPairsInText(text,[{open: '(', close:')'}, 
  //                                                     {open: '[', close:']'}, 
  //                                                     {open: '{', close:'}'}]))

});

}
/*  Фильтрую текст от всех лишних символов, кроме указанных в объекте.

*/
function filterTextByPairs(text, pairObjArray){
  let a = []
  for (let i = 0; i < text.length; i++){

    for (let pairObj of pairObjArray){
      if (pairObj.open === text[i] || pairObj.close === text[i]){
        a.push(text[i])        
      }
    }
  
  }
  return a
}

/*
  Функция для поиска пар в тексте. Вызывает две вспомогательные функции 
  фильтрации текста, и поиска пар в массиве.
*/

function checkPairsInText(text, pairObjArray){
  if(text){
    let a = filterTextByPairs(text, pairObjArray)
    return checkPairsInArray(a, pairObjArray)
  }
  else return false
}

/*  Идея такая - перебрать массив со скобочками с конца, как только встретил первую
    открывающую скобку, проверяю следующий по возрастанию элемент массива, если это
    та же закрывающая скобка, то удаляю их массива открывающую и закрывающую скобки,
    и передаю оставшийся массив рекурсивно в следующий вызов функции.
    Если это скобка другого типа, то значит скобки непарные и сразу возвращаю false.
    
    В конце концов дойдем до того, что скобок будет либо одна, это значит что у скобки
    нет пары, и это условие выхода из рекурсии - возвращаю false.

    Либо из массива удалятся абсолютно все пары, тогда не захожу в цикл и возвращаю true,
    значит у всех скобок были пары.

    Либо может быть случай, когда остались только закрывающие скобки, тогда дохожу жо конца функции
    и возвращаю false.

    Скобки передаю в виде массива объектов с парами {open: '(', close:')'}

*/
function checkPairsInArray(a, pairObjArray) {
  if (a.length === 1){
    return false
  }
  if (a.length === 0){
    return true
  }

  for(let i = a.length - 1; i >= 0; i--){
    
    for (let pairObj of pairObjArray){
      if (pairObj.open === a[i]){
        if(pairObj.close === a[i+1]){
          a.splice(i, 2)
          return checkPairsInArray(a, pairObjArray)

        }
        else {
          return false
        }
      }
    }
  }
  return false
}



// console.log(checkPairsInText('(){()(rffdfdfgd)}(((dfgd([])[{}])))()', [{open: '(', close:')'}, 
//                                                       {open: '[', close:']'}, 
//                                                       {open: '{', close:'}'}]))