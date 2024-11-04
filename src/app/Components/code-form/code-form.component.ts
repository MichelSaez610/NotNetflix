import { Component, AfterViewInit  } from '@angular/core';

@Component({
  selector: 'app-code-form',
  standalone: true,
  imports: [],
  templateUrl: './code-form.component.html',
  styleUrl: './code-form.component.css'
})
export class CodeFormComponent implements AfterViewInit {

  ngAfterViewInit() {
    // Get the search overlay and search elements
    const searchOverlay = document.querySelector('.search-overlay');
    const search = document.querySelector('.search');

    // Variables to store the cloned element and offsets
    let clone: HTMLElement;
    let offsetX: number, offsetY: number;

    if (search) {
      // Add click event listener to the search element
      search.addEventListener('click', function (this: HTMLElement) {
        // Clone the original search element
        const original = this;
        clone = original.cloneNode(true) as HTMLElement;

        // Activate the search overlay
        if (searchOverlay) {
          searchOverlay.classList.add('s--active');
          searchOverlay.appendChild(clone);
        }

        // Hide the original search element
        original.classList.add('s--hidden');
        clone.classList.add('s--cloned', 's--hidden');

        // Calculate the offsets for the clone element
        const originalRect = original.getBoundingClientRect();
        const cloneRect = clone.getBoundingClientRect();
        offsetX = originalRect.left - cloneRect.left;
        offsetY = originalRect.top - cloneRect.top;

        // Move the clone to the original position
        clone.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
        clone.classList.remove('s--hidden');

        // Reflow to apply changes
        void (searchOverlay as HTMLElement).offsetHeight;

        // Add the moving class to the clone
        clone.classList.add('s--moving');
        clone.style.transform = '';

        // Listen for the end of the transition to open the search
        clone.addEventListener('transitionend', openAfterMove);
      });
    }

    // Function to handle opening the search after the move
    function openAfterMove() {
      clone.classList.add('s--active');
      (clone.querySelector('input') as HTMLInputElement).focus();
      addCloseHandler(clone);
      clone.removeEventListener('transitionend', openAfterMove);
    }

    // Function to add a close handler to the search clone
    function addCloseHandler(parent: HTMLElement) {
      const closeBtn = parent.querySelector('.search__close');
      if (closeBtn) {
        closeBtn.addEventListener('click', closeHandler);
      }
    }

    // Function to handle closing the search
    function closeHandler(e: Event) {
      clone.classList.remove('s--active');
      e.stopPropagation();
      const cloneBg = clone.querySelector('.search__bg');
      if (cloneBg) {
        cloneBg.addEventListener('transitionend', moveAfterClose);
      }
    }

    // Function to handle moving the clone back after closing
    function moveAfterClose(e: Event) {
      e.stopPropagation();
      clone.classList.add('s--moving');
      clone.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
      clone.addEventListener('transitionend', terminateSearch);
    }

    // Function to clean up after the search is closed
    function terminateSearch(e: Event) {
      search?.classList.remove('s--hidden');
      clone.remove();
      searchOverlay?.classList.remove('s--active');
    }
  }
}
