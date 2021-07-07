var fs = require('fs'); 
var parse = require('csv-parse');

function getRandom(min,max) {
  return Math.random() * (max - min + 1) + min;
}

var csvData=[];
fs.createReadStream('Sensor_Data.csv')
    .pipe(parse({delimiter: ':'}))
    .on('data', function(csvrow) {
        console.log(csvrow);

        //***********************************csvrow manipulation*******************************
        
        var curr_data = csvrow[2].split(/[ ,]+/);
        var curr_data1 = csvrow[0].split(/[ ,]+/);
        var curr_data2 = csvrow[1].split(/[ ,]+/);

        curr_data[1]=parseFloat(curr_data[1])+getRandom(-2,2);
        curr_data[2]=parseFloat(curr_data[2])+getRandom(-2,2);

       new_csvrow = curr_data.join()
       new_csvrow1=curr_data1.join();
       new_csvrow2=curr_data2.join();

       X_csvrow=new_csvrow2.concat(':', new_csvrow);
       Y_csvrow=new_csvrow1.concat(':',X_csvrow)
        console.log(Y_csvrow);

        //***********************************csvrow manipulation*******************************

        csvData.push(Y_csvrow);        
    })
    .on('end',function() {
      //***********************************csv manipulation*******************************
      console.log(csvData);
      reducedData = csvData.join("\n");
      fs.writeFile('Sensor_Data_Reduced.csv',reducedData, 'utf8', function (err) {
        if (err) {
          console.log('Some error occured - file either not saved or corrupted file saved.');
        } else{
          console.log('It\'s saved!');
        }
      });
      //***********************************csv manipulation*******************************

    });