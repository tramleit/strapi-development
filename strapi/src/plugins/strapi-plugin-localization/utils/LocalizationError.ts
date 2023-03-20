class LocalizationError extends Error {
  additionalInfo?: string;

  constructor(message?: string, additionalInfo?: string) {
    super(message);
    this.additionalInfo = additionalInfo;
  }
}

export default LocalizationError;
