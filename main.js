video = "";
status="";
objects= []
volume_num = ""
objectDetector= ""


function preload(){

 video = createVideo('video.mp4')
 video.hide()
}





function setup(){

    canvas = createCanvas(480,380);
    canvas.center();

}
function start(){

    objectDetector = ml5.objectDetector('cocossd',modelLoaded);

    document.getElementById('status').innerHTML = "Status: Detecting"

}



function modelLoaded(){
    console.log("model loaded!")
    status - true;

    video.loop();
  //  video.volume(volume_num);
    video.speed(1);
    video.volume(0);
}
function draw(){

    image(video,0,0,480,380)
    
    if(status != ""){
        objectDetector.detect(video, gotResult);
        console.log('works!')
        for(i = 0;i < objects.legnth; i++){
            document.getElementById('status').innerHTML = 'Status: Objects Detected'
            document.getElementById('number_objects').innerHTML = 'Number of objects detected are:' + objects.length
            fill('#fc031c')
            percent = floor(objects[i].confidence * 100)
            text(objects[i].label+ " " + percent + "%", objects[i].x+15, objects[i].y+15)
            noFill();

            stroke('#fc031c');
            rect(objects[i].x,objects[i].y,objects[i].width, objects[i].height)
        }
    }

    
}
function stop(){
    video.stop()
}

function pause(){
    video.pause()
}

function slider_value(){
    volume_num = document.getElementById('slider').value;
    video.volume(volume_num);
    console.log(volume_num)
}

function gotResult(error,results){
if(error){
    console.log(error);
}
console.log(results);
objects = results
}