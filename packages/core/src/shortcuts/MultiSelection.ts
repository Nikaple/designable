import { KeyCode, Shortcut } from '../models'

export const SelectNodes = new Shortcut({
  codes: [KeyCode.Meta],
})

export const SelectSameTypeNodes = new Shortcut({
  codes: [KeyCode.Shift],
})

export const SelectAllNodes = new Shortcut({
  codes: [KeyCode.Meta, KeyCode.A],
  handler(context) {
    const operation = context?.workspace.operation
    if (operation) {
      const tree = operation.tree
      const selection = operation.selection
      selection.batchSelect(tree.childrens)
      operation.snapshot()
    }
  },
})