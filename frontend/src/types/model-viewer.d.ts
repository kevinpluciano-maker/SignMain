declare namespace JSX {
  interface IntrinsicElements {
    'model-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      src?: string;
      alt?: string;
      'camera-controls'?: boolean;
      'disable-zoom'?: string;
      'interaction-prompt'?: string;
      reveal?: string;
      'auto-rotate'?: boolean;
      autoplay?: boolean;
      'ar'?: boolean;
      'ar-modes'?: string;
      'camera-orbit'?: string;
      'field-of-view'?: string;
      'min-camera-orbit'?: string;
      'max-camera-orbit'?: string;
      'min-field-of-view'?: string;
      'max-field-of-view'?: string;
      loading?: string;
      poster?: string;
      onLoad?: () => void;
      onError?: () => void;
    };
  }
}