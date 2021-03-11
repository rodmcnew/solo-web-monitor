export interface Monitor {//@TODO move to types folder or something
  id: string,
  name: string,
  url: string,
  interval: number,
  up: boolean
}
