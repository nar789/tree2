
const k=20000;
console.log(`insert into rental values`);
for(var i=0;i<k;i++)
{
  //var line=`insert into phone values(null,'MODEL${i}','VZW','SERIAL${i}','CTS','IMEI${i}','BARCODE${i}','','','','',0,now());`;
  var line=`(null,1,30766,8,now(),'rental')`;

  console.log(line);
  if(i!=k-1)
  	console.log(',');
  else
  	console.log(';');
}