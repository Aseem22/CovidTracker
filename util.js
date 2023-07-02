export const sortData= (data) => {
const sorteddata=[...data];
return sorteddata.sort((a,b) =>(a.cases>b.cases ? (-1): (1)))
 
}