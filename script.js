//Để save: localStorage.setItem("key","value")
// để load: document.getElementById("someWhereInHTMLTags").innerHTML=localStorage.getItem("thatKey")
// để gán vào biến: Let containerForObjectFromLocalStorage=localStorage.getItem("theKey")
// hint: Key là 1 string, và value cũng là 1 string
// nên mới có dòng localStorage.setItem("yourKey", JSON.stringify(theObjectYouWantToSave));

//  new event -> new value object -> push object history array -> stringtify the array
//-> save in localStorage -> get the STRING from storage -> transform it back to array
//-> loop through the array to get each Object -> document.innerHtml= Object.thingYouWantToWriteToWeb

// let historyArray;
// if (localStorage.getItem("historyArray")) {
//   historyArray = JSON.parse(localStorage.getItem("historyArray"));
// } else {
//   historyArray = [];
// }

let historyArray = localStorage.getItem("historyArray")
  ? JSON.parse(localStorage.getItem("historyArray"))
  : [];
let likeList = localStorage.getItem("likeList")
  ? JSON.parse(localStorage.getItem("likeList"))
  : [];
let dislikeList = localStorage.getItem("dislikeList")
  ? JSON.parse(localStorage.getItem("dislikeList"))
  : [];
const getData = async () => {
  try {
    // get data from API and daclare variable data with value is a json file of data
    const response = await fetch("https://foodish-api.herokuapp.com/api");
    const data = await response.json();
    // push data to HTML to export img to screen and searching keyword to href button
    document.getElementById("img").src = data.image;
    document.getElementById("search").href = `https://www.google.com/search?q=${
      data.image.split("/")[4]
    }`;

    historyArray.push(data.image);
    localStorage.setItem("historyArray", JSON.stringify(historyArray));
    console.log(historyArray);
    // renderArray(historyArray, likeList);
  } catch (error) {
    console.log(error);
  }
};
getData();
console.log(historyArray);

const handleLikeClick = (historyArray) => {
  likeList.push(historyArray.length - 1);
  localStorage.setItem("likeList", JSON.stringify(likeList));
};

const handleDislikeClick = (historyArray) => {
  dislikeList.push(historyArray.length - 1);
  localStorage.setItem("dislikeList", JSON.stringify(dislikeList));
};

/* historyArray = [0:"https://foodish-api.herokuapp.com/images/biryani/biryani57.jpg",
                  1:"https://foodish-api.herokuapp.com/images/pizza/pizza28.jpg",
                  2:"https://foodish-api.herokuapp.com/images/pizza/pizza51.jpg"]
*/

/*list = [0,1,2,5,7,8]
 */

const renderArray = (array, list) => {
  let x = list
    .map((element) => {
      return `<li><img src="${array[element]}" alt="${element}"></li>`;
    })
    .join("");
  document.getElementById("liked-food").innerHTML = x;
};
renderArray(historyArray, likeList);
renderArray(historyArray, dislikeList);
// data = {"image" : "https://foodish-api.herokuapp.com/images/burger/burger57.jpg"}
