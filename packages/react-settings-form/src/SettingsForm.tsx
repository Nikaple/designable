import React, { useMemo } from 'react'
import { createForm } from '@formily/core'
import { Form } from '@formily/antd'
import { observer } from '@formily/react'
import { Empty } from 'antd'
import cls from 'classnames'
import { useSelection, useTree, usePrefix } from '@designable/react'
import { SchemaField } from './SchemaField'
import { ISettingFormProps } from './types'
import { SettingsFormContext } from './context'
import './styles.less'

const useSelected = () => {
  const selection = useSelection()
  return selection?.selected || []
}

const useCurrentNode = () => {
  const selected = useSelected()
  const tree = useTree()
  return tree?.findById?.(selected[0])
}

export const SettingsForm: React.FC<ISettingFormProps> = observer((props) => {
  const node = useCurrentNode()
  const selected = useSelected()
  const prefix = usePrefix('settings-form')
  const form = useMemo(() => {
    return createForm({
      values: node?.props,
    })
  }, [node])

  if (node && node.designerProps?.propsSchema && selected.length === 1) {
    return (
      <div className={cls(prefix, props.className)} style={props.style}>
        <SettingsFormContext.Provider value={props}>
          <Form
            form={form}
            colon={false}
            labelWidth={120}
            labelAlign="left"
            wrapperAlign="right"
            feedbackLayout="none"
          >
            <SchemaField schema={node.designerProps.propsSchema as any} />
          </Form>
        </SettingsFormContext.Provider>
      </div>
    )
  }
  return (
    <div className={prefix + '-empty'}>
      <Empty />
    </div>
  )
})
