/* 
1.get data.
    -from main.js maybe.
2.filtrera hämtad data.
- make sure all data is lowercase

3. send filter data to challenges.js
    -to be showned

 */
const fakeAPI = [
  {
    id: 1,
    title: "Solve a Puzzle",
    type: "online",
    tags: ["logic", "puzzle"],
    rating: 4.5,
  },
  {
    id: 2,
    title: "Climb a Mountain",
    type: "on-site",
    tags: ["outdoor", "physical"],
    rating: 5,
  },
  {
    id: 3,
    title: "Code a Calculator",
    type: "online",
    tags: ["coding", "logic"],
    rating: 3.8,
  },
];

// fake search
const searchWord = "Puzzle";
const byType = "on-site";


function searchFilter(fakeAPI, searchWord) {
  const result = fakeAPI.filter((allaObject) =>
    allaObject.title.toLowerCase().includes(searchWord.toLowerCase())
  );

//   console.log(result);
}


function searchType (fakeAPI, byType) {
  const result = fakeAPI.filter((allaObject) => 
  allaObject.type.includes(byType));

  console.log(result);
}





function supersearchFilter(rating = null,type=null,c=null,d=null){

    if(d === null){
        console.log("jag är en potatis")
    }

}




// our search
searchType(fakeAPI,byType)
searchFilter(fakeAPI, searchWord);
supersearchFilter(2,3,4)
