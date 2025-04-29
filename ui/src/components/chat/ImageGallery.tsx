interface ImageGalleryProps {
    images: string[];
    selected: string[];
    toggleImage: (src: string) => void;
    confirmSelection: () => void;
  }
  
  export default function ImageGallery({ images, selected, toggleImage, confirmSelection }: ImageGalleryProps) {
    return (
      <div className="p-0 mt-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Images</h3>
        <div className="grid grid-cols-2 gap-4">
          {images.map((src, index) => (
            <div
              key={index}
              className={`cursor-pointer rounded-lg overflow-hidden shadow-md border-4 transition-all ${
                selected.includes(src) ? "border-blue-500" : "border-white dark:border-gray-800"
              }`}
              onClick={() => toggleImage(src)}
            >
              <img src={src} alt={`Gallery image ${index + 1}`} className="w-full h-auto" />
            </div>
          ))}
        </div>
        {selected.length > 0 && (
          <div className="mt-4">
            <button
              onClick={confirmSelection}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
            >
              Confirm Selection ({selected.length})
            </button>
          </div>
        )}
      </div>
    );
  }
  