declare module "*.svg"
declare module "*.png"
declare module "*.jpg"

declare module "*.module.scss" {
  interface ClassNames {
    [className: string]: string
  }
  const classNames: ClassNames
  export = classNames
}
