import React from 'react'

export const getGeneSuggestionValue = (gene) => gene.name
export const renderGeneSuggestion = (gene) => <div>{gene.name}</div>

export const getTagSuggestionValue = (tag) => tag.name
export const renderTagSuggestion = (tag) => <div>{tag.name}</div>
