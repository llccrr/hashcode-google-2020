


export const algoDim = () =>{

    ////////
    // CONST DATA FROM INPUT
    const totalDurationAvailable = 30;
    const totalLibrariesData = [{libId:23,speedScan:3, signUpDuration:3, numberOfBooks:4, books:[{id:42,score:552},{id:42,score:552},{id:42,score:552},{id:42,score:552}]},{libId:35,speedScan:2, signUpDuration:3, books:[{id:32,score:332},{id:49,score:102},{id:92,score:72},{id:46,score:582}]},{libId:41,speedScan:7, signUpDuration:3, books:[{id:82,score:552},{id:43,score:5521},{id:45,score:52},{id:52,score:352}]}];

    ////////
    // CONST COMPUTED DATA
    const allBooksId = totalLibrariesData.reduce((acc1,library)=>{
        return [...acc1, ...library.books.map(book=>book.id).filter(book=>!acc1.includes(book))];
    },[]);


    ////////
    // UPDATED DATA
    let cptDay =0;

    // libraryUsedInOrder: Array of objects {id:string, speedScan:number, signUpDuration:number,numberOfBooks:number, books:[book]}
    let librariesUsedInOrder  = [];
    let booksIdUsed = [];


    // On loop en attendant la durée max
    while(cptDay<totalDurationAvailable){
        const librariesIdUsed  = librariesUsedInOrder.map(libraryObject=>(libraryObject.libId));
        const librariesStillAvailable = totalLibrariesData.filter(library=>!librariesIdUsed.includes(library.libId));

        if(librariesStillAvailable.length===0)break;

            const totalAvailableBooksId=allBooksId.filter(bookId=>!booksIdUsed.includes(bookId));
        // Find most interesting library

        const maxScoreByLibrary = librariesStillAvailable.map(libraryAvailable=>{

            const booksStillAvailable = libraryAvailable.books.filter(book=>totalAvailableBooksId.includes(book.id));
            const averageScorePerAvailableBook = booksStillAvailable.reduce((sum,book)=>(sum + book.score),0)/booksStillAvailable.length;
            const scorePerDay = libraryAvailable.speedScan * averageScorePerAvailableBook;

            const maxPossibleScore = scorePerDay * (totalDurationAvailable - cptDay - libraryAvailable.signUpDuration);

            // console.log('OTher,', {...libraryAvailable, score:maxPossibleScore});
            return {...libraryAvailable, score:maxPossibleScore};
        });

        // console.log('maxScoreByLibrary,',maxScoreByLibrary);


        const libraryToUse = maxScoreByLibrary.sort(orderDescScore)[0];
        // console.log('libraryToUse,',libraryToUse);

        const booksIdUsedInCurrentLibraryInDescOrder=libraryToUse.books.sort(orderDescScore).map(book=>book.id);
        const libraryWellSortedToUse = {...libraryToUse, books : booksIdUsedInCurrentLibraryInDescOrder};

        booksIdUsed=[...booksIdUsed,booksIdUsedInCurrentLibraryInDescOrder];

        // console.log('libraryToUseWellSorted,',libraryToUseWellSorted);

        librariesUsedInOrder.push({libId:libraryWellSortedToUse.libId, books:libraryWellSortedToUse.books });
        cptDay+=libraryWellSortedToUse.signUpDuration;

    }

    // console.log("Algo End, and output: ", librariesUsedInOrder);

    return librariesUsedInOrder;
};

const orderDescScore =(a, b) =>{
    if (a.score > b.score) {
        return -1;
    }
    if (a.score < b.score) {
        return 1;
    }
    // a must be equal to b
    return 0;
}



const RESULT = algoDim();
console.log('RESULT', RESULT);