// Ссылка на элемент веб страницы в котором будет отображаться графика 
var container; 
 
// Переменные "камера", "сцена" и "отрисовщик" 
var camera, scene, renderer;

var N = 10; 

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
    camera.position.set(N/2, N*2, N/2); 

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

    triangles(); 
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
    geometry.vertices.push(new THREE.Vector3( i, 0.0, j)); 
} 

//Добавление индексов (порядок соединения вершин) в массив индексов   
for (var i = 0; i < N-1; i++) 
for (var j = 0; j < N-1; j++) 
{
    var ind0 = i + j*N; 
    var ind1 = (i+1) + j*N; 
    var ind3 = (i+1) + (j+1)*N;
    var ind2 = i + (j+1)*N; 

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
// Создание загрузчика текстур 
var loader = new THREE.TextureLoader(); 
// Загрузка текстуры grasstile.jpg из папки pics 
var tex = loader.load( 'pics/yachik3.jpg' );


var mat = new THREE.MeshBasicMaterial
({     
    // Источник цвета - текстура     
    map: tex,     
    wireframe: false,     
    side: THREE.DoubleSide 
});



var triangleMaterial = new THREE.MeshBasicMaterial
({ 
    vertexColors:THREE.VertexColors,
    wireframe: true, 
    side:THREE.DoubleSide 
}); 


// Режим повторения текстуры 
//tex.wrapS = tex.wrapT = THREE.RepeatWrapping;  
// Повторить текстуру 10х10 раз 
//tex.repeat.set( 10, 10 ); 


// Создание объекта и установка его в определённую позицию 
var triangleMesh = new THREE.Mesh(geometry, mat); 
triangleMesh.position.set(0.0, 0.0, 0.0); 





// Добавление объекта в сцену 
scene.add(triangleMesh); 
} 
