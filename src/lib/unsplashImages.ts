// API configuration
const UNSPLASH_ACCESS_KEY = "hJ-9mHjz40Lk4EfmFt_kzbFqKF1QMAu4-KvXVSH21Ts";
const MAX_PER_REQUEST = 30;

export interface UnsplashImage {
    id: string;
    alt_description: string | null;
    urls: {
      small: string;
      regular: string;
      full: string;
  
      [key: string]: string;
    };
  }
  
  async function fetchUnsplashImages(totalCount = 100): Promise<UnsplashImage[]> {
    const allImages: UnsplashImage[] = [];
  
    try {
      while (allImages.length < totalCount) {
        const needed = Math.min(MAX_PER_REQUEST, totalCount - allImages.length);
        const response = await fetch(
          `https://api.unsplash.com/photos/random?count=${needed}&client_id=${UNSPLASH_ACCESS_KEY}`
        );
  
        if (!response.ok) {
          throw new Error(`Unsplash API error: ${response.statusText}`);
        }
  
        // The response will be an array of images
        const data: UnsplashImage[] = await response.json();
        allImages.push(...data);
      }
      return allImages;
    } catch (error) {
      console.error("Error fetching images from Unsplash:", error);
      throw error;
    }
  }
  
  async function fetchUnsplashImagesByKeyword(keyword: string): Promise<UnsplashImage | null> {
    const encodedKeyword = encodeURIComponent(keyword);
  
    try {
      const response = await fetch(
        `https://api.unsplash.com/photos/random?query=${encodedKeyword}&count=1&client_id=${UNSPLASH_ACCESS_KEY}`
      );
  
      if (!response.ok) {
        throw new Error(`Unsplash API error: ${response.statusText}`);
      }
  
      const data: UnsplashImage[] = await response.json();
      
      // If no image was returned for this keyword
      if (data.length === 0) {
        console.warn(`No image found for keyword: ${keyword}`);
        return null;
      }
      
      return data[0];
    } catch (error) {
      console.error(`Error fetching image from Unsplash for keyword "${keyword}":`, error);
      throw error;
    }
  }
  
  export { fetchUnsplashImages, fetchUnsplashImagesByKeyword };