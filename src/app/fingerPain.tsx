import { useState } from 'react';

//mock 
const fingerAreas = [
    { id: 'mcp', label: 'mcp', coords: [
        { x: 36, y: 42 },
        { x: 41, y: 38 },
        { x: 48, y: 36 },
        { x: 58, y: 38 },
        { x: 71, y: 53 },
    ] },
    { id: 'pip', label: 'pip', coords: [
        { x: 26, y: 32 },
        { x: 36, y: 26 },
        { x: 47, y: 21 },
        { x: 59, y: 23 },
        { x: 79, y: 43 },
    ] },
    { id: 'dip', label: 'dip', coords: [
        { x: 23, y: 26 },
        { x: 35, y: 14 },
        { x: 45, y: 10 },
        { x: 57, y: 13 },
    ] },
  ];
  


const FingerPain: React.FC = () => {
    const [coords, setCoords] = useState<{ x: number; y: number } | null>(null);
    const [selectedArea, setSelectedArea] = useState<string | null>(null);
    const [isSelected, setIsSelected] = useState<boolean>(false);

    const isWithinArea = (x: number, y: number, area: { coords: { x: number, y: number }[] }) => {
        return area.coords.some(coord => {
          const tolerance = 5; //size
          return (
            x >= coord.x - tolerance &&
            x <= coord.x + tolerance &&
            y >= coord.y - tolerance &&
            y <= coord.y + tolerance
          );
        });
      };
  
    // const handleImageClick = (event: React.MouseEvent<HTMLImageElement>) => {
    //   const rect = (event.target as HTMLImageElement).getBoundingClientRect();
    //   const x = ((event.clientX - rect.left) / rect.width) * 100;
    //   const y = ((event.clientY - rect.top) / rect.height) * 100;
    //   setCoords({ x, y });
    //   console.log(`X: ${x}%, Y: ${y}%`);
    // };

    const handleImageClick = (event: React.MouseEvent<HTMLImageElement>) => {
        const rect = (event.target as HTMLImageElement).getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;
    
        setCoords({ x, y });
    
        for (const area of fingerAreas) {
            const aa =isWithinArea(x, y, area);
            console.log(aa)
          if (aa) {
            setSelectedArea(area.id);
            setIsSelected(true);
            break;
          }
        }
      };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
         <div className='flex flex-col block border border-gray-200 rounded-lg shadow p-6 items-center'>
        <h2 className="text-xl mb-4">จุดไหนที่คุณปวดนิ้วมากที่สุด ?</h2>
        <div className="image-container relative w-full">
          <img
            src="/images/default-finger.png"
            alt="Finger Pain"
            className="w-full"
            onClick={handleImageClick}
          />
          {selectedArea && (
            <>
                <img
                    src={`/images/${selectedArea}-highlight.png`}
                    alt={`${selectedArea} selected`}
                    className="absolute top-0 left-0 w-full h-full pointer-events-none"
                    style={{ zIndex: 10 }}
                />
                <img
                    src={`/images/${selectedArea}-active.png`}
                    alt={`${selectedArea} selected`}
                    className="absolute top-0 left-0 w-full h-full pointer-events-none"
                    style={{ zIndex: 10 }}
                />
            </>
          )}
          {/* {fingerAreas.map(area => (
            <div
              key={area.id}
              onClick={() => toggleArea(area.id)}
              className={`overlay-area ${isSelected(area.id) ? 'highlighted' : ''}`}
              style={{
                position: 'absolute',
                top: `${area.coords[0].y}%`,
                left: `${area.coords[0].x}%`,
                width: '10%',
                height: '10%',
                backgroundColor: isSelected(area.id) ? 'rgba(255, 0, 0, 0.5)' : 'transparent',
                zIndex: isSelected(area.id) ? 11 : 9, 
                pointerEvents: 'none'
              }}
            >
            </div>
          ))} */}
        </div>
      </div>
        {coords && (
        <div className="mt-4 text-center">
          <p>Coordinates: X: {coords.x}, Y: {coords.y}</p>
        </div>
      )}
      
      <button className={`w-full items-center mt-4 px-4 py-2 text-white rounded ${!isSelected ? 'cursor-not-allowed bg-gray-500 opacity-50' : 'bg-blue-500'} `}>ต่อไป</button>
    </div>
  );
};

export default FingerPain;
