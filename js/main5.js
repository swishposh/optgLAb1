
// Ссылка на элемент веб страницы в котором будет отображаться графика 
var container; 


// Переменные "камера", "сцена" и "отрисовщик" 
var camera, scene, renderer;

// Глобальная переменная для хранения карты высот 
var imagedata; 

var spotlight = new THREE.PointLight(0xffffff);
var N = 256;
var a = 0.0;

// Функция инициализации камеры, отрисовщика, объектов сцены и т.д. 
init(); 
 
// Обновление данных по таймеру браузера 
animate();

// В этой функции можно добавлять объекты и выполнять их первичную настройку 
function init() 
{ 
    // Получение ссылки на элемент html страницы     
    container = document.getElementById( 'container' );     
    // Создание "сцены"     
    scene = new THREE.Scene(); 

    // Установка параметров камеры     
    // 45 - угол обзора     
    // window.innerWidth / window.innerHeight - соотношение сторон     
    // 1 - 4000 - ближняя и дальняя плоскости отсечения 
    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 4000 ); 


  // Установка позиции камеры     
  //camera.position.set(5, 5, 5);   
    camera.position.set(N/2, N/2, N*2); ///,skb bpvtytybz

     // Установка точки, на которую камера будет смотреть     
     //camera.lookAt(new THREE.Vector3( 0,  0.0, 0));
    camera.lookAt(new THREE.Vector3( N/2, 0.0, N/2)); 


     // Создание отрисовщика 
    renderer = new THREE.WebGLRenderer( { antialias: false } ); 
    renderer.setSize( window.innerWidth, window.innerHeight );
    
    renderer.setClearColor( 0x00FF7F, 1); 

    container.appendChild( renderer.domElement ); 

    // Добавление функции обработки события изменения размеров окна 
    window.addEventListener( 'resize', onWindowResize, false ); 


    //установка позиции источника освещения 
    spotlight.position.set(100, 100, 100); 
    //добавление источника в сцену 
    scene.add(spotlight);


    var canvas = document.createElement('canvas'); 
    var context = canvas.getContext('2d'); 
    var img = new Image(); 


    img.onload = function() 
 {     
    canvas.width = img.width;     
    canvas.height = img.height;     
    context.drawImage(img, 0, 0 );     
    imagedata = context.getImageData(0, 0, img.width, img.height); 
 
    // Пользовательская функция генерации ландшафта     
    triangles(); 
 } 
 
 // Загрузка изображения с картой высот 
    img.src = 'pics/plateau.jpg'; 
} 

function onWindowResize() 
{ 
     // Изменение соотношения сторон для виртуальной камеры 
    camera.aspect = window.innerWidth / window.innerHeight; 
    camera.updateProjectionMatrix(); 
     // Изменение соотношения сторон рендера 
    renderer.setSize( window.innerWidth, window.innerHeight ); 
}  

// В этой функции можно изменять параметры объектов и обрабатывать действия пользователя 
function animate() 
{ 
    spotlight.position.x = N/2 + N/2*Math.cos(a);  //// нужно очень
    spotlight.position.y = 0 + N/2*Math.sin(a); //// нужно очень

    a += 0.01; //// нужно очень

     // Добавление функции на вызов, при перерисовки браузером страницы 
    requestAnimationFrame( animate ); 

    render(); 
} 

function render() 
{ 
     // Рисование кадра 
    renderer.render( scene, camera ); 
} 


function triangles() 
{ 
    // Создание структуры для хранения вершин 
    var geometry = new THREE.Geometry(); 
    
    for (var i = 0; i < N; i++) 
    for (var j = 0; j < N; j++) 
 { 
    var y = getPixel( imagedata, i, j ); //// нужно очень
    geometry.vertices.push(new THREE.Vector3( i, y/8.0, j)); ////// изменения были - высота 
 } 

 //Добавление индексов (порядок соединения вершин) в массив индексов   
 for (var i = 0; i < N-1; i++) 
 for (var j = 0; j < N-1; j++) 
 {
    var ind0 = i + j*N; 
    var ind1 = (i+1) + j*N; 
    var ind2 = i + (j+1)*N; 
    var ind3 = (i+1) + (j+1)*N;
    

    geometry.faces.push(new THREE.Face3(ind0, ind1, ind2)); 
    geometry.faces.push(new THREE.Face3(ind1, ind3, ind2)); 

    geometry.faceVertexUvs[0].push([
        new THREE.Vector2(i/(N-1), j/(N-1)),      
        new THREE.Vector2((i+1)/(N-1), j/(N-1)),      
        new THREE.Vector2(i/(N-1), (j+1)/(N-1))]);

    geometry.faceVertexUvs[0].push([
        new THREE.Vector2((i+1)/(N-1), j/(N-1)),     
        new THREE.Vector2((i+1)/(N-1), (j+1)/(N-1)),      
        new THREE.Vector2(i/(N-1), (j+1)/(N-1))]);
    
 }
   geometry.computeFaceNormals();  //// нужно очень
   geometry.computeVertexNormals(); //// нужно очень



 // Создание загрузчика текстур 
 var loader = new THREE.TextureLoader(); 
 // Загрузка текстуры grasstile.jpg из папки pics 
 var tex = loader.load( 'pics/grasstile.jpg' );


 var mat = new THREE.MeshLambertMaterial //важное изменение 
 ({     
    // Источник цвета - текстура     
    map: tex,     
    wireframe: false,     
    side: THREE.DoubleSide 
 });



 //var triangleMaterial = new THREE.MeshBasicMaterial    не нужно
 //({ 
   // vertexColors:THREE.VertexColors,
  //  wireframe: true, 
   // side:THREE.DoubleSide 
 //}); 




 // Создание объекта и установка его в определённую позицию 
 var triangleMesh = new THREE.Mesh(geometry, mat); 
 /////triangleMesh.position.set(0.0, 0.0, 0.0); не нужно

 // Добавление объекта в сцену 
 scene.add(triangleMesh); 
} 


function getPixel( imagedata, x, y )  
{     
    var position = ( x + imagedata.width * y ) * 4, data = imagedata.data;     
    return data[ position ];; 
}


