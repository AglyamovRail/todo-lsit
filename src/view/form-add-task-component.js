import { AbstractComponent } from '../framework/view/abstract-component.js';

function createFormAddTaskComponentTemplate() {
  return (
    `<section class="enter">
        <h2>Новая задача</h2>
        <div>
            <form>
                <input type="text" name="text" class="input-text" placeholder="Название задачи..." required>
                <input type="submit" name="submit" class="input-submit" value="＋ Добавить">
            </form>
        </div>
     </section>`
  );
}

export default class FormAddTaskComponent extends AbstractComponent {
  get template() {
    return createFormAddTaskComponentTemplate();
  }
}
