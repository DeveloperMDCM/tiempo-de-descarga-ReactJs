import { useState, useEffect } from "react";
import FileUpload from './components/FileUpload'

const App = () => {
  const [archivoSize, setArchivoSize] = useState(100);
  const [archivoSizeUnit, setArchivoSizeUnit] = useState("MB");
  const [velocidadDescarga, setVelocidadDescarga] = useState(5);
  const [velocidadDescargaUnit, setVelocidadDescargaUnit] = useState("Mbps");
  const [tiempoDescarga, setTiempoDescarga] = useState(null);
  const [tiempoFormateado, setTiempoFormateado] = useState(null);
  const unidadesArchivo = ["KB", "MB", "GB", "TB", "PB"];
  const unidadesVelocidad = ["Kbps", "Mbps", "Gbps", "Tbps", "Pbps"];

  useEffect(() => {
    calcularTiempoDescarga();
  }, [archivoSize, archivoSizeUnit, velocidadDescarga, velocidadDescargaUnit]);

  const calcularTiempoDescarga = () => {
    if (!archivoSize && !velocidadDescarga) {
      setTiempoDescarga(null);
      return;
    }

    // Convertir tamaño del archivo a bytes
    const sizeInBytes =
      archivoSize * Math.pow(1024, unidadesArchivo.indexOf(archivoSizeUnit));
    const velocidadDescargaBitsPerSecond =
      velocidadDescarga *
      Math.pow(1024, unidadesVelocidad.indexOf(velocidadDescargaUnit));

    // Calcular tiempo en segundos
    const tiempoSegundos = sizeInBytes / (velocidadDescargaBitsPerSecond / 8);

    console.log(tiempoSegundos);

    if(tiempoSegundos<0.1){
      const time = tiempoSegundos;
      setTiempoDescarga(time*1000);
    }else if(tiempoSegundos<=0.000) {
      setTiempoDescarga(time*10000);
    }
    
    else {
      setTiempoDescarga(tiempoSegundos);
    }
  };
  function formatTimeDynamic(seconds) {
    const units = [['día', 'días'], ['hora', 'horas'], ['minuto', 'minutos'], ['segundo', 'segundos']];
    let formattedTime = '';
    if(velocidadDescarga !=='' && archivoSize !==''){
      for (let i = 0; i < units.length; i++) {
        const unitValue = Math.floor(seconds / (60 ** (units.length - 1 - i)));
        console.log(unitValue, 'valor');
        if (unitValue > 0) {
          formattedTime += unitValue + ' ' + (unitValue === 1 ? units[i][0] : units[i][1]) + ' ';
          seconds %= 60 ** (units.length - 1 - i);
        }
      }
    }else {

    }
  
    return formattedTime.trim();
  }

  useEffect(()=> {
    
    setTiempoFormateado(formatTimeDynamic(tiempoDescarga));
    // console.log("Tiempo de descarga:", tiempoFormateado);
  },[tiempoDescarga])

  return (
    <div>
      <h1 className="text-center text-5xl font-bold mb-10 text-white mt-10">
        Calcular el tiempo de descarga⏱️
      </h1>
      <div className="grid place-content-center gap-2">
        <div className="max-w-sm bg-white border mx-auto border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
         <FileUpload />
          <div className="p-5">
            <a href="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
                Arrastra un arhivo aqui
              </h5>
            </a>
          </div>
        </div>

        <div className=" p-4 mx-auto">
          <h3 className="text-white font-bold">Tamaño</h3>
          <div>
            <input
              className="px-5 rounded-l-md text-center py-4 text-sm font-medium border-none outline-none bg-gray-700 text-white"
              type="number"
              defaultValue={archivoSize}
              placeholder="100"
              onChange={(e) => {
                if(parseFloat(e.target.value)<1) {
                  setArchivoSize(parseFloat(1));
                  console.log('no valido');
                }else {

                  setArchivoSize(parseFloat(e.target.value));
                }
              }}
            />
            <div className="inline-flex rounded-md shadow-sm" role="group">
              {unidadesArchivo.map((unit) => (
                <button
                  key={unit}
                  className={`px-5 py-4 text-sm font-medium last-button border border-gray-200  dark:border-gray-600 text-white hover:text-white hover:bg-red-500  ${
                    archivoSizeUnit === unit
                      ? "hover:text-red-700 focus:z-10  bg-red-500"
                      : "bg-gray-700"
                  }`}
                  onClick={() => setArchivoSizeUnit(unit)}
                >
                  {unit}
                </button>
              ))}
            </div>
          </div>
          <h3 className="text-white font-bold">Velocidad</h3>
          <div>
            <input
              className="px-5 rounded-l-md text-center py-4 text-sm font-medium border-none outline-none bg-gray-700 text-white"
              type="number"
              defaultValue={velocidadDescarga}
              placeholder="1"
              onChange={(e) => {
              
                setVelocidadDescarga(parseFloat(e.target.value));
              }}
            />
            <div className="inline-flex rounded-md shadow-sm" role="group">
              {unidadesVelocidad.map((unit) => (
                <button
                  key={unit}
                  className={`px-5 py-4 text-sm font-medium last-button border border-gray-200  dark:border-gray-600 text-white hover:text-white hover:bg-red-500  ${
                    velocidadDescargaUnit === unit
                      ? "hover:text-red-700 focus:z-10  bg-red-500"
                      : "bg-gray-700"
                  }`}
                  onClick={() => setVelocidadDescargaUnit(unit)}
                >
                  {unit}
                </button>
              ))}
            </div>
          </div>
          <span className="text-white">
            1 Mbps equivale a 0.125 MB por segundo
          </span>
        </div>
        <div className="mx-auto text-center">
          <p className="text-white">Tardaría</p>
          <p className="text-white font-bold text-4xl m-4">{tiempoFormateado   ? tiempoFormateado :<span className="text-6xl">⚡Ultra⚡</span>}</p>
          <p className="text-white">
            Para descargar un archivo de {archivoSize} {archivoSizeUnit}.
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;
