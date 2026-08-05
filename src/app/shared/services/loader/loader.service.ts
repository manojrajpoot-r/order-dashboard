import { Service, signal } from '@angular/core';

@Service()
export class LoaderService {
  isLoading = signal(false);


  show() {

    this.isLoading.set(true);

  }


  hide() {

    this.isLoading.set(false);

  }
}
