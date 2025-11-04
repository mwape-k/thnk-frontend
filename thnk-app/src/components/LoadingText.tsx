interface LoadingProps {
  title?: string;
  isLoading?: boolean;
}

const LoadingText: React.FC<LoadingProps> = ({
  title = "Setting things up...",
  isLoading = false,
}) => {
  const useEffect = () => {
    if (isLoading) {
      return (
        <div className="w-full h-full flex justify-center items-center">
          <h1>{title}</h1>
        </div>
      );
    }
  };

  return (
    <div className="w-full h-full">
      <h1>{title}</h1>
    </div>
  );
};

export default LoadingText;
