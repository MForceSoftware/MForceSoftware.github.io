(function () {
    const state = {
        boardSortable: null,
        taskSortables: [],
        dotNetRef: null,
    };

    function destroySortables() {
        if (state.boardSortable) {
            state.boardSortable.destroy();
            state.boardSortable = null;
        }

        for (const sortable of state.taskSortables) {
            sortable.destroy();
        }
        state.taskSortables = [];
    }

    function readSiblingDataId(start, directionProperty, dataAttribute) {
        let sibling = start ? start[directionProperty] : null;
        while (sibling) {
            const value = sibling.dataset ? sibling.dataset[dataAttribute] : null;
            if (value) {
                return value;
            }
            sibling = sibling[directionProperty];
        }

        return "";
    }

    function invokeDotNet(methodName, ...args) {
        if (!state.dotNetRef) {
            return;
        }

        state.dotNetRef.invokeMethodAsync(methodName, ...args).catch((error) => {
            console.warn("projectBoardInterop invoke failed", methodName, error);
        });
    }

    function initTaskSortables(boardElement) {
        const taskLists = boardElement.querySelectorAll(".project-task-list[data-bucket-id]");

        for (const taskList of taskLists) {
            const sortable = window.Sortable.create(taskList, {
                group: "project-task-list",
                draggable: ".project-task-card",
                handle: ".project-task-drag-handle",
                animation: 150,
                ghostClass: "project-drag-ghost",
                onEnd: (event) => {
                    const taskId = event.item?.dataset?.taskId || "";
                    const bucketId = event.to?.dataset?.bucketId || "";
                    const previousTaskId = readSiblingDataId(event.item, "previousElementSibling", "taskId");
                    const nextTaskId = readSiblingDataId(event.item, "nextElementSibling", "taskId");

                    if (!taskId || !bucketId) {
                        return;
                    }

                    invokeDotNet("OnTaskDragEnd", taskId, bucketId, previousTaskId, nextTaskId);
                },
            });

            state.taskSortables.push(sortable);
        }
    }

    function initBucketSortable(boardElement) {
        state.boardSortable = window.Sortable.create(boardElement, {
            draggable: ".project-bucket",
            handle: ".project-bucket-handle",
            animation: 150,
            ghostClass: "project-drag-ghost",
            onEnd: (event) => {
                const bucketId = event.item?.dataset?.bucketId || "";
                const previousBucketId = readSiblingDataId(event.item, "previousElementSibling", "bucketId");
                const nextBucketId = readSiblingDataId(event.item, "nextElementSibling", "bucketId");

                if (!bucketId) {
                    return;
                }

                invokeDotNet("OnBucketDragEnd", bucketId, previousBucketId, nextBucketId);
            },
        });
    }

    window.projectBoardInterop = {
        init: (dotNetRef) => {
            destroySortables();
            state.dotNetRef = dotNetRef || null;

            if (!state.dotNetRef || typeof window.Sortable === "undefined") {
                return;
            }

            const boardElement = document.querySelector("[data-project-board]");
            if (!boardElement) {
                return;
            }

            initBucketSortable(boardElement);
            initTaskSortables(boardElement);
        },
        dispose: () => {
            destroySortables();
            state.dotNetRef = null;
        },
    };
})();
