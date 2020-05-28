// Ссылка на элемент веб страницы в котором будет отображаться графика 
var container; 
 
// Переменные "камера", "сцена" и "отрисовщик" 
var camera, scene, renderer; 


// Функция инициализации камеры, отрисовщика, объектов сцены и т.д. 
init(); 
 
// Обновление данных по таймеру браузера 
animate();

// В этой функции можно добавлять объекты и выполнять их первичную настройку 
function init()  {     
    // Получение ссылки на элемент html страницы     
    container = document.getElementById( 'container' );     
    // Создание "сцены"     
    scene = new THREE.Scene(); 
 
    // Установка параметров камеры     
    // 45 - угол обзора     
    // window.innerWidth / window.innerHeight - соотношение сторон     
    // 1 - 4000 - ближняя и дальняя плоскости отсечения     
    camera = new THREE.PerspectiveCamera (45, window.innerWidth / window.innerHeight, 1, 4000 );     
 
    // Установка позиции камеры     
    camera.position.set(5, 5, 5);          
    // Установка точки, на которую камера будет смотреть     
    camera.lookAt(new THREE.Vector3( 0,  0.0, 0));   
 
    // Создание отрисовщика     
    renderer = new THREE.WebGLRenderer( { antialias: false } );     
    renderer.setSize( window.innerWidth, window.innerHeight );     
    // Закрашивание экрана синим цветом, заданным в 16ричной системе     
    renderer.setClearColor( 0x000000ff, 1); 
 
    container.appendChild( renderer.domElement ); 
 
    // Добавление функции обработки события изменения размеров окна     
    window.addEventListener( 'resize', onWindowResize, false ); 

    topp();
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


function topp()
{
    // Создание структуры для хранения вершин 
    var geometry = new THREE.Geometry();

// Добавление координат вершин в массив вершин 
geometry.vertices.push(new THREE.Vector3( 1.0, 0.0, 3.0)); 
geometry.vertices.push(new THREE.Vector3( 1.0, 3.0, 0.0)); 
geometry.vertices.push(new THREE.Vector3( 3.0, 0.0, 1.0)); 
 
//Добавление индексов (порядок соединения вершин) в массив индексов   
geometry.faces.push(new THREE.Face3(0, 1, 2)); 
    

    //Добавление цветов для вершин 
    geometry.faces[0].vertexColors[0] = new THREE.Color(0xff0000); 
    geometry.faces[0].vertexColors[1] = new THREE.Color(0x00ff00); 
    geometry.faces[0].vertexColors[2] = new THREE.Color(0x0000ff); 




    var triangleMaterial = new THREE.MeshBasicMaterial
({     
    vertexColors:THREE.VertexColors,     
    wireframe: false,     
    side:THREE.DoubleSide 
});

// Создание объекта и установка его в определённую позицию 
var triangleMesh = new THREE.Mesh(geometry, triangleMaterial); 
triangleMesh.position.set(0.0, 0.0, 0.0); 

// Добавление объекта в сцену      
scene.add(triangleMesh); 
}



