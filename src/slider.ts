import { Selection } from 'd3';
import { clamp } from '@equinor/videx-math';

/**
 * Settings used to initialize slider module
 */
interface SliderSettings {
  /**
   * Header placed above slider module.
   */
  header: string,
  /**
   * Minimum value of slider.
   */
  min: number,
  /**
   * Maximum value of slider.
   */
  max: number,
  /**
   * Step-size for slider.
   */
  step: number,
  /**
   * Initial value of slider.
   */
  value: number,
  /**
   * If true, display label becomes textbox.
   */
  dualInput: boolean,
};

/**
 * Appends a slider module to provided d3 node.
 * @param root d3 div element node to append slider
 * @param settings Collection of settings to use when creating module
 * @param callback Callback function used when value changes
 */
export function slider (root: Selection<HTMLDivElement, undefined, null, undefined>, settings: SliderSettings, callback: (d: number) => void): void {
  // get settings variables
  const header: string = settings.header || 'Slider';
  const min: number = settings.min || 0;
  const max: number = settings.max || 100;
  const step: number = settings.step || 1;
  let value: number = settings.value === undefined ? 50 : settings.value;
  const dualInput: boolean = settings.dualInput || false;

  root.append('div')
    .style('font-weight', 'bold')
    .style('width', '400px')
    .style('height', '20px')
    .text(header);

  const range: Selection<HTMLInputElement, undefined, null, undefined> = root.append('input')
    .attr('type', 'range')
    .style('margin-top', '0px')
    .style('width', '200px')
    .attr('min', min)
    .attr('max', max)
    .attr('step', step)
    .attr('value', value);

  if(dualInput) {
    const number: Selection<HTMLInputElement, undefined, null, undefined> = root.append('input')
      .style('position', 'relative')
      .style('top', '-6px')
      .style('left', '10px')
      .style('width', '100px')
      .style('font-size', '18px')
      .style('font-family', 'var(--serif)')
      .attr('type', 'number')
      .attr('min', min)
      .attr('max', max)
      .attr('step', step)
      .attr('lang', 'en-US')
      .attr('value', value);

    // Initial callback
    if (callback && typeof callback === 'function') callback(value);

    // Listeners
    range.on('input', () => {
      number.node().valueAsNumber = value = range.node().valueAsNumber;
      if (callback && typeof callback === 'function') callback(value);
    });
    number.on('change', () => {
      let targetValue = number.node().valueAsNumber;
      targetValue = clamp(targetValue, min, max);
      // Re-update all inputs
      range.node().valueAsNumber = value = targetValue;
      if (callback && typeof callback === 'function') callback(value);
    });

  } else {
    const text = root.append('div')
      .style('position', 'absolute')
      .style('top', '17px')
      .style('left', '316px')
      .style('font-size', '18px')
      .text(value); // Initial set

    range.on('input', () => {
      value = range.node().valueAsNumber;
      text.text(value);
      if (callback && typeof callback === 'function') callback(value);
    });
  }
}
