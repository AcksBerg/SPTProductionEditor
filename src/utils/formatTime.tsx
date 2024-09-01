export const formatTime = (seconds: number): string => {
    const days = Math.floor(seconds / 86400);
    seconds %= 86400;
  
    const hours = Math.floor(seconds / 3600);
    seconds %= 3600;
  
    const minutes = Math.floor(seconds / 60);
    seconds %= 60;
  
    const result: string[] = [];
    if (days > 0) result.push(`${days} day${days > 1 ? "s" : ""}`);
    if (hours > 0) result.push(`${hours} hour${hours > 1 ? "s" : ""}`);
    if (minutes > 0) result.push(`${minutes} minute${minutes > 1 ? "s" : ""}`);
    if (seconds > 0 || result.length === 0) result.push(`${seconds} second${seconds > 1 ? "s" : ""}`);
  
    return result.join(", ");
  };
  