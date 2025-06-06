import React, { memo, Fragment, useMemo, useState, useCallback, MouseEvent } from 'react'
import styled from 'styled-components'
import { Flavor, ChartProperty } from '../../../types'
import { ArrayControlConfig, ControlContext } from '../types'
import { PropertyHeader, Help, Cell, Toggle } from '../ui'
import { ControlsGroup } from '../ControlsGroup'

interface ArrayControlProps<Item> {
    id: string
    property: ChartProperty
    value: Item[]
    flavors: Flavor[]
    currentFlavor: Flavor
    config: ArrayControlConfig<Item>
    onChange: (value: Item[]) => void
    context?: ControlContext
}

function NonMemoizedArrayControl<Item = object>({
    property,
    flavors,
    currentFlavor,
    value,
    onChange,
    config: {
        props,
        shouldCreate = false,
        addLabel = 'add',
        shouldRemove = false,
        removeLabel = 'remove',
        defaults = {} as Item,
        getItemTitle,
    },
    context,
}: ArrayControlProps<Item>) {
    const [activeItems, setActiveItems] = useState([0])
    const append = useCallback(() => {
        onChange([...value, { ...defaults }])
        setActiveItems([value.length])
    }, [value, onChange, defaults, setActiveItems])

    const remove = useCallback(
        (index: number) => (event: MouseEvent) => {
            event.stopPropagation()
            const items = value.filter((_item: any, i) => i !== index)
            setActiveItems([])
            onChange(items)
        },
        [value, onChange, setActiveItems]
    )
    const change = useCallback(
        (index: number) => (itemValue: Item) => {
            onChange(
                value.map((v, i) => {
                    if (i === index) return itemValue
                    return v
                })
            )
        },
        [value, onChange]
    )
    const toggle = useCallback(
        (index: number) => () => {
            setActiveItems(items => {
                if (items.includes(index)) {
                    return items.filter(i => i !== index)
                }
                return [...activeItems, index]
            })
        },
        [setActiveItems]
    )

    const subProps = useMemo(
        () =>
            props.map(prop => ({
                ...prop,
                name: prop.key,
                group: property.group,
            })),
        [props]
    )

    const newContext = {
        path: [...(context ? context.path : ([] as string[])), (property.key || property.name)!],
    }

    return (
        <>
            <Header>
                <PropertyHeader {...property} context={context} />
                <Help>{property.help}</Help>
                {shouldCreate && <AddButton onClick={append}>{addLabel}</AddButton>}
            </Header>
            {value.map((item, index) => (
                <Fragment key={index}>
                    <SubHeader $isOpened={activeItems.includes(index)} onClick={toggle(index)}>
                        <Title>
                            {getItemTitle !== undefined
                                ? getItemTitle(index, item)
                                : `${property.key}[${index}]`}
                            {shouldRemove && (
                                <RemoveButton onClick={remove(index)}>{removeLabel}</RemoveButton>
                            )}
                        </Title>
                        <Toggle isOpened={activeItems.includes(index)} />
                    </SubHeader>
                    {activeItems.includes(index) && (
                        <ControlsGroup
                            name={property.key}
                            flavors={flavors}
                            currentFlavor={currentFlavor}
                            controls={subProps}
                            settings={item}
                            onChange={change(index)}
                            context={{ path: [...newContext.path, `${index}`] }}
                        />
                    )}
                </Fragment>
            ))}
        </>
    )
}

export const ArrayControl = memo(NonMemoizedArrayControl) as typeof NonMemoizedArrayControl

const Header = styled(Cell)`
    border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};

    &:last-child {
        border-bottom-width: 0;
    }
`

const Title = styled.div`
    white-space: nowrap;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.textLight};
`

const SubHeader = styled(Cell)<{
    $isOpened: boolean
}>`
    cursor: pointer;
    font-weight: 600;
    user-select: none;
    border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};

    &:last-child {
        border-bottom-width: 0;
    }

    &:hover {
        background: ${({ theme }) => theme.colors.cardAltBackground};

        ${Title} {
            color: ${({ theme }) => theme.colors.text};
        }
    }

    ${Title} {
        ${({ $isOpened, theme }) => ($isOpened ? `color: ${theme.colors.text};` : '')}
    }
`

const AddButton = styled.div`
    position: absolute;
    top: 9px;
    right: 20px;
    font-weight: 600;
    cursor: pointer;
    font-size: 12px;
    color: ${({ theme }) => theme.colors.accent};
    border: 1px solid ${({ theme }) => theme.colors.accent};
    padding: 3px 9px;
    border-radius: 2px;
    user-select: none;

    &:hover {
        color: ${({ theme }) => theme.colors.cardBackground};
        background: ${({ theme }) => theme.colors.accent};
    }
`

const RemoveButton = styled.span`
    display: inline-block;
    font-size: 12px;
    margin-left: 12px;
    background: ${({ theme }) => theme.colors.cardBackground};
    color: ${({ theme }) => theme.colors.accent};
    border: 1px solid ${({ theme }) => theme.colors.accent};
    padding: 1px 9px;
    border-radius: 1px;

    &:hover {
        color: ${({ theme }) => theme.colors.cardBackground};
        background: ${({ theme }) => theme.colors.accent};
    }
`
